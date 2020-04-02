import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";
import 'styles/views/CreateLobbyView.scss';
import ChooseUsernameWindow from "components/ChooseUsernameWindow";
import {WindowTransition} from "components/ui/Transitions";
import {api} from "utils/api";
import Spinner from "components/ui/Spinner";
import LobbyWindow from "components/ui/LobbyWindow";
import sessionManager from "utils/sessionManager";

/**
 * Asks the user for a username, then sends a request
 * and renders a LobbyWindow with received token.
 *
 * PROPS:
 * mode: string - "join" or "create", sets whether the view should try to create or join a lobby
 */
class LobbyView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let content;
        if (this.state.loading) {
            content = <Spinner key="spinner"/>;
        } else if (this.state.authToken) {
            content =
                <LobbyWindow
                    key="LobbyWindow"
                    adminMode={this.props.mode === 'create'}
                    authToken={this.state.authToken}
                />;
        } else {
            content =
                <ChooseUsernameWindow
                    key="UsernameWindow"
                    onConfirm={u => this.confirmUsername(u)}
                />;
        }

        return (
            <AppContainer withBack withHelp>
                <WindowTransition>
                    {content}
                </WindowTransition>
            </AppContainer>
        );
    }

    async confirmUsername(username) {
        this.setState({loading: true});
        try {
            let response;
            if (this.props.mode === 'create') {
                response = await api.post('/lobbies', {username: username});
            }
            else if (this.props.mode === 'join') {
                response = await api.put(`/lobbies/${sessionManager.lobbyId}`, {username: username});
            }
            this.setState({authToken: response.data.token});
        } catch (ignore) {
            console.error(ignore);
        }
    }
}

export default LobbyView;