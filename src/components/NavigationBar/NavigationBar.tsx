import "./NavigationBar.sass";

import { Component, createRef } from "preact";

interface ComProps {
    
}

interface ComState {

}

export default class NavigationBar extends Component<ComProps, ComState> {
    navRef = createRef();

    constructor(props: ComProps) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    getNavElRef = () => {
        return this.navRef.current;
    }

    render() {
        return (
            <nav ref={this.navRef}>
                <div id="nav-scroller">
                    <div id="nav-buttons">
                        {this.props.children}
                    </div>
                </div>
            </nav>
        );
    }
}