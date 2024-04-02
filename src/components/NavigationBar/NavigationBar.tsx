import './NavigationBar.sass';

import { Component } from 'preact';

interface ComProps {

}

interface ComState {

}

export default class NavigationBar extends Component<ComProps, ComState> {

    constructor(props: ComProps) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <nav class="container-fluid">
                <div class="row">
                    <div class="col-auto">
                        {this.props.children}
                    </div>
                </div>
            </nav>
        );
    }
}