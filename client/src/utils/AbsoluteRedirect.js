import React from "react";

class AbsoluteRedirect extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.location = this.props.to;
  }

  render() {
    return (
      <div className="cuerpo">
        <h3>Redirigiendo...</h3>
      </div>
    );
  }
}

export default AbsoluteRedirect;
