import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
          () => this.tick(),
          1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: new Date()
        });
    }
    render() {
        let h = ('0'+this.state.time.getHours()).slice(-2);
        let m = ('0'+this.state.time.getMinutes()).slice(-2);
        return (
            <span>
                {h}:{m}
            </span>
        );
    }
}

export default Clock;