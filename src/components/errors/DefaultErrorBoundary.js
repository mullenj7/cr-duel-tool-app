import React from 'react';
import { PropTypes } from 'prop-types';

class DefaultErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(){
        return {hasError: true}
    }

    render() {
        const {hasError} = this.state;
        const {children} = this.props;
        if (hasError){
            return <div>something went wrong</div>
        }
        return children;
    }
}
DefaultErrorBoundary.propTypes = {
    children: PropTypes.node,
};
DefaultErrorBoundary.defaultProps = {
    children: null
};

export default DefaultErrorBoundary;