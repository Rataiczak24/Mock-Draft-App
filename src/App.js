import React from 'react';
import './App.css';
import Board from './Components/Board';
import Card from './Components/Card';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            value: 'Select a Player'
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      // this.setState({value: event.target.value});

      let filteredPlayers = [];
      for (let i = 0; i < this.state.len; i++) {
        const playerLoop = this.state.allPlayers[i];
        filteredPlayers.push(playerLoop);
      }
      
      const playerFilter = filteredPlayers.filter(player => player.name.includes(event.target.value));
      this.setState({ value: event.target.value, person: playerFilter, len: playerFilter.length });
    }

    async componentDidMount() {
        const url = "https://parsehub.com/api/v2/runs/t0sL3T3-YriC/data?api_key=tdSwsNjNMLhc";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            playerDropdown: data,
            allPlayers: data.selection1,
            allPlayersLength: data.selection1.length,
            person: data.selection1,
            loading: false,
            len: data.selection1.length
        });
    }

    render() {
      let items = [];
      for (let i = 0; i < this.state.len; i++) {
        const item = this.state.person[i];
        items.push(item);

        if(i === 5)
        {
          break;
        }
      }

 
      let name = items.map((item) => (
        <React.Fragment key={item.rank}>
          <Card id={item.rank} className="card" draggable="true">          
            {item.name}
          </Card>
        </React.Fragment>
      ))

      let playerDropdown = [];
      for (let i = 0; i < this.state.allPlayersLength; i++) {
        const allPlayer = this.state.playerDropdown.selection1[i];
        playerDropdown.push(allPlayer);

        if(i === 5)
        {
          break;
        }
      }

      let options = playerDropdown.map((allPlayer) => (
        <React.Fragment key={allPlayer.rank}>
          <option id={allPlayer.rank}>
            {allPlayer.name}
          </option>
        </React.Fragment>
      ))

      return (

        <div className="app">
 
          <select value={this.state.value} onChange={this.handleChange} className="dropdown">
            <option>Select a Player</option>
              {options}
          </select>

          <main className="flexbox">
            <Board id="board-1" className="board">
              {name}
            </Board>

            <Board id="board-2" className="board"></Board>
          </main>
        </div>
      );
    }
  }