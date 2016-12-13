import React, { PropTypes } from 'react'

class Quiz extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){
    var { id } = this.props.params;
  }

  render () {
    var { id } = this.props.params;
    return (
      <div>
        Quiz Component for id { id }
      </div>
    );
  }
}

export default Quiz;
