import glamorous from 'glamorous';
import * as React from 'react';

interface Props {
  searchValue: string;
  onValueChange(value: string): void;
}

const Root = glamorous.div({
  padding: '20px 30px',
});

const Input = glamorous.input({
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid #fff',
  color: '#fff',
  fontSize: 16,
  outline: 'none',
});

export class NavigationSearch extends React.Component<Props> {
  private handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.onValueChange(e.currentTarget.value);
  }

  public render() {
    const { onValueChange, searchValue } = this.props;
    return (
      <Root>
        <Input
          placeholder='Search'
          type='text'
          value={searchValue}
          onChange={this.handleSearchChange}
        />
      </Root>
    );
  }
}
