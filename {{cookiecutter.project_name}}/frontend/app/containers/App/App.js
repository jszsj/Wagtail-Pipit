import React, { PureComponent } from 'react';
import { keysToCamelFromSnake } from '../../utils/caseconverters';
import './App.scss';

const cache = {};

function importAll(r) {
    r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../../containers', true, /index.js$/));

class App extends PureComponent {

    render() {
        const camelProps = {...keysToCamelFromSnake(this.props)};
        const {
            componentName,
            componentProps
        } = camelProps;

        if(!componentName) {
            return false;
        }

        const Component = cache[componentName];

        return (
            <Component {...keysToCamelFromSnake(componentProps)} />
        );
    }
}

export default App;
