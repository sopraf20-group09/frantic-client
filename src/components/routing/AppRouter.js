import React from 'react';
import 'components/routing/AppRouter';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainMenu from "components/views/MainMenu";
import LobbyView from "components/views/LobbyView";
import LobbyBrowserView from "components/views/LobbyBrowserView";
import CardDisplay from "components/views/CardDisplay";
import HelpView from "components/views/HelpView";
import JoinLobbyView from "components/views/JoinLobbyView";
import GameView from "components/views/GameView";
import EndView from "components/views/EndView";
import LobbyGuard from "components/routing/guards/LobbyGuard";
import AnimationView from "components/views/AnimationView";

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <MainMenu/>
                    </Route>
                    <Route exact path="/create">
                        <LobbyGuard>
                            <LobbyView mode="create"/>
                        </LobbyGuard>
                    </Route>
                    <Route exact path="/join">
                        <LobbyGuard>
                            <LobbyView mode="join"/>
                        </LobbyGuard>
                    </Route>
                    <Route exact path="/join/:id">
                        <JoinLobbyView/>
                    </Route>
                    <Route exact path="/browse">
                        <LobbyBrowserView mode="join"/>
                    </Route>
                    <Route exact path="/game">
                        <GameView/>
                    </Route>
                    <Route exact path="/help">
                        <HelpView/>
                    </Route>
                    <Route exact path="/cards">
                        <CardDisplay/>
                    </Route>
                    <Route exact path="/end/round">
                        <EndView mode="round"/>
                    </Route>
                    <Route exact path="/end/game">
                        <EndView mode="game"/>
                    </Route>
                    <Route exact path="/animations/:event">
                        <AnimationView/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
