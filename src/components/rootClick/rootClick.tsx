import * as React from 'react';

type ElementRef = (node: HTMLElement) => void;

export interface Props {
  isDisabled?: boolean;
  onRootClick(e: MouseEvent): void;
  children?(props: { ref: ElementRef} ): React.ReactNode;
}

export class RootClick extends React.Component<Props> {
  private rootNode: HTMLElement;

  public componentDidMount() {
    if (!this.props.isDisabled) {
      this.addEventListener();
    }
  }

  public componentDidUpdate(prevProps: Props) {
    if (!this.props.isDisabled && prevProps.isDisabled) {
      this.addEventListener();
    } else if (this.props.isDisabled && !prevProps.isDisabled) {
      this.removeEventListener();
    }
  }

  public componentWillUnmount() {
    this.removeEventListener();
  }

  private handleElementRef: ElementRef = (element) => {
    this.rootNode = element;
  }

  private addEventListener() {
    document.addEventListener('click', this.handleClick, true);
  }

  private removeEventListener() {
    document.removeEventListener('click', this.handleClick, true);
  }

  private handleClick = (e: MouseEvent) => {
    if (!this.rootNode.contains(e.target as Node)) {
      this.props.onRootClick(e);
    }
  }

  public render() {
    return this.props.children({ ref: this.handleElementRef });
  }
}
