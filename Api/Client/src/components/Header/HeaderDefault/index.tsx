import * as React from 'react';

interface IHeaderDefaultProps {
}

const HeaderDefault: React.FunctionComponent<IHeaderDefaultProps> = (props) => {
  return (
      <nav>
          <p>Header Default</p>
      </nav>
  );
};

export default HeaderDefault;
