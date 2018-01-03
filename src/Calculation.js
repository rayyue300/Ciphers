import React from 'react';

class Calculation extends React.Component {
    constructor(props) {
        super(props);
    }

    static xgcd(a, m) {
        if (m == 0) {
            return [1, 0, a]
        } else {
            var temp = this.xgcd(m, a % m);
            var x = temp[0];
            var y = temp[1];
            var d = temp[2];
            return [y, x-y*Math.floor(a/m), d]
            //return x;
        }
    }

    static mod(n, m) {
        return ((n % m) + m) % m;
    }

    static b2d(n) {
        return parseInt(n,2).toString(10);
    }

    static d2b(n) {
        return parseInt(n,10).toString(2);
    }
    
    render() {
        return (
            <div>
            </div>
        );
    }
}

export default Calculation;