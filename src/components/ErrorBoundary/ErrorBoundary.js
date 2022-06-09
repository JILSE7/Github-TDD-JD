import React from 'react';


export class ErrorBoundary extends React.Component {

  constructor(props){
    super(props);
    this.state = {hasError:false}
  }

  static getDerivedStateFromError(){
    return { hasError: true}
  }

  handleReloadClick = () => window.location.reload();

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if(hasError) {
      return (
        <>
          <p>There is un unexpected error</p>
          <button onClick={this.handleReloadClick}>Reload</button>
        </>
      )
    }

    return children
  }
}