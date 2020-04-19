import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class UDDrag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    }
  }

  componentWillMount() {
    this.pubSubToken = PubSub.subscribe(this.props.id, this.onIncomingEvent.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubSubToken);
  }

  onIncomingEvent(eventName, event) {
    if (event.type === "requestState") {
      var data = {
        attributes: {
          hidden: this.state.hidden,
        }
      }
      UniversalDashboard.post(`/api/internal/component/element/sessionState/${event.requestId}`, data);
    }
    else if (event.type === "setState") {
      this.setState(event.state.attributes);
    }
    else if (event.type === "removeElement") {
      this.setState({
        hidden: true
      });
    }
  }

  render() {

    // These props are returned from PowerShell!
    // return <h1>{this.state.text}</h1> // un comment the line to render using value from state.
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[25, 25]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <div className="handle">Drag from here</div>
          <div>{this.props.content}</div>
        </div>
      </Draggable>
    );
  }
}

export default UDDrag
