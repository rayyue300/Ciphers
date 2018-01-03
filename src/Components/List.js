import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        var content = this.props.content;
        var contentList = content.map(function(i){
            return (
                <li className="w3-padding-16">
                    <span className="w3-large">
                        {i.heading}
                    </span>
                    <br />
                    {/* <span>{i.content}</span> */}
                    {i.content 
                        ? i.content.split("\n").map(c => <span> {c} <br/></span>) 
                        : ""}
                </li>
            );
        });
        return (
            <div>
                <p className="w3-opacity"><b>{this.props.title}</b></p>
                <ul className="w3-ul w3-card w3-white">
                    {contentList}
                </ul>
            </div>
        );
    }
}

export default List;