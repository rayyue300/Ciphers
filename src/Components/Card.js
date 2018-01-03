import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        /* var content = this.props.content;
        var contentList = content.map(function(i){
            return (
                <li className="w3-padding-16">
                    <span className="w3-large">
                        {i.heading}
                    </span>
                    <br />
                    <span>{i.content}</span>
                </li>
            );
        }); */
        return (
            <div>
                <p className="w3-opacity"><b>{this.props.title}</b></p>
                <div className="w3-card w3-white">
                    <div className="w3-container">
                        {/* {contentList} */}
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;