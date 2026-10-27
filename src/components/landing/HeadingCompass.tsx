/** Bússola 3D decorativa da faixa "Seu próximo objetivo": CSS puro, sem imagem e sem biblioteca. */
export function HeadingCompass() {
  return (
    <div className="cmp" aria-hidden="true">
      <div className="cmp__scene">
        <div className="cmp__shadow" />
        <div className="cmp__bezel">
          <div className="cmp__dial">
            <span className="cmp__ticks" />
            <span className="cmp__rose" />
            <b className="cmp__n">N</b>
            <b className="cmp__e">L</b>
            <b className="cmp__s">S</b>
            <b className="cmp__w">O</b>
            <div className="cmp__needle">
              <i className="cmp__north" />
              <i className="cmp__south" />
            </div>
            <span className="cmp__pin" />
          </div>
          <span className="cmp__glass" />
        </div>
      </div>
    </div>
  );
}
