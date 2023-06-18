declare module 'codebar/components/Header/Header.jsx' {
  import { FC } from 'react';
  const Header: FC;
  export default Header;
  }
  
  declare module 'codebar/components/Main/Main.jsx' {
  import { FC } from 'react';
  const Main: FC;
  export default Main;
  }
  
  declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }
  