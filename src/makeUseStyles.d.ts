declare function makeUseStyles<Theme extends {}, Styles extends {}>(
  styles: Styles | ((theme: Theme) => Styles)
): () => Styles;

export default makeUseStyles;
