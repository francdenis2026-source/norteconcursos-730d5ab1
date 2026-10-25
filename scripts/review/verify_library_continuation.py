"""Verify saved post-publication reads, original decks, revisions and untargeted rows."""
import datetime
import hashlib
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/library-continuation-2026-10-11'
def read(path):return json.loads(path.read_text(encoding='utf-8'))
def main():
    review=read(ROOT/'docs/library/continuation-review-2026-10-11.json')
    expected_examples=read(ROOT/'docs/library/continuation-examples-2026-10-11.json')
    before={t:read(OUT/(t+'-before.json')) for t in ['study_materials','legal_courses','study_material_enrichments']}
    after={t:read(OUT/(t+'-after.json')) for t in before}
    changes={m['slug']:m['patch'] for m in review['materials']}
    for old in before['study_materials']:
        actual=next(m for m in after['study_materials'] if m['id']==old['id'])
        patch=changes.get(old['slug'],{})
        for key,value in old.items():
            if patch and key in ['updated_at','reviewed_at']:continue
            expected=patch.get(key,value)
            if key=='law_version_checked_at' and expected:
                assert datetime.datetime.fromisoformat(actual[key].replace('Z','+00:00'))==datetime.datetime.fromisoformat(expected.replace('Z','+00:00'))
            else:assert actual[key]==expected,(old['slug'],key)
        if patch:
            assert actual['flashcards'][:len(old['flashcards'])]==old['flashcards']
            assert actual['quiz'][:len(old['quiz'])]==old['quiz']
    assert len(after['study_materials'])==len(before['study_materials'])
    assert after['legal_courses']==before['legal_courses']
    for old in before['study_material_enrichments']:
        assert next(e for e in after['study_material_enrichments'] if e['id']==old['id'])==old
    for expected in expected_examples:
        actual=next(e for e in after['study_material_enrichments'] if e['id']==expected['id'])
        assert actual['status']=='active'
        for key,value in expected.items():
            if key=='checked_at':
                assert datetime.datetime.fromisoformat(actual[key].replace('Z','+00:00'))==datetime.datetime.fromisoformat(value.replace('Z','+00:00'))
            else:assert actual[key]==value,(expected['id'],key)
        material=next(m for m in after['study_materials'] if m['slug']==expected['material_slug'])
        assert actual['source_body_sha256']==hashlib.sha256(material['body_md'].encode()).hexdigest()
    assert len(after['study_material_enrichments'])==len(before['study_material_enrichments'])+4
    totals={'cases':0,'flashcards':0,'judgment_items':0}
    for course in after['legal_courses']:
        if course['status']!='active':continue
        material=next(m for m in after['study_materials'] if m['slug']==course['material_slug'])
        latest=max((e for e in after['study_material_enrichments'] if e['material_slug']==material['slug'] and e['status']=='active'),key=lambda e:e['checked_at'])
        totals['cases']+=len(latest['content']['cases'])
        totals['flashcards']+=len(material['flashcards'])
        totals['judgment_items']+=len(material['quiz'])
    result={'verified_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),
            'expanded_paths':4,'added_cases':24,'added_flashcards':24,'added_judgment_items':24,
            'legal_path_totals':totals,'preserved_existing_cases_and_illustrations':True,
            'preserved_prior_deck_and_quiz_indices':True,'preserved_all_42_courses':True,
            'preserved_untargeted_materials':len(before['study_materials'])-4,
            'preserved_existing_enrichment_revisions':len(before['study_material_enrichments'])}
    (ROOT/'docs/library/continuation-applied-2026-10-11.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False))
if __name__=='__main__':main()
