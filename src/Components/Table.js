import React from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        var classes = "w3-table w3-responsive " + this.props.className;
        return (
            <table className={classes}>
                {this.props.content.map(i => {
                    return (
                        <tr>
                            {i.map(j => {
                                return <td>{j}</td>;
                            })}
                        </tr>
                    )
                })}
            </table>
        );
    }
}

export default Table;