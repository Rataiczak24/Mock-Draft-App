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
        }
    }

    //https://parsehub.com/api/v2/runs/tvS1igFk0ZF4/data?api_key=tdSwsNjNMLhc

    async componentDidMount() {
        const url = "https://parsehub.com/api/v2/runs/t0sL3T3-YriC/data?api_key=tdSwsNjNMLhc";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ person: data, loading: false, len: data.selection1.length });
    }

    render() {
      let items = [];
      for (let i = 0; i < this.state.len; i++) {
        const item = this.state.person.selection1[i];
        items.push(item);
      }
      
      let name = items.map((item) => (
        <>
          <Card id={item.rank} key={item.rank} className="card" draggable="true">
              <li key={item.rank}>
                {item.name}
              </li>
          </Card>
        </>
      ))

      return (

        <div className="app">
          <main className="flexbox">
            <Board id="board-1" className="board">
                {name}
            </Board>

            <Board id="board-2" className="board"></Board>
          </main>
        </div>


        /*
        <div>
          {this.state.loading || !this.state.person ? (
            <div>loading...</div>
          ) : (
            <div className="float half">
              {
                items.map((item) => (
                  <>
                    <span>{item}</span>
                    <hr />
                  </>
                ))
              }
            </div>
          )}


        {this.state.loading || !this.state.person ? (
            <div>loading...</div>
          ) : (
            <div className="float half">
              {
                items.map((item) => (
                  <>
                  <table>
                    <tbody>
                    <tr>
                      <td>
                        
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  </>
                ))
              }
            </div>
          )}
        </div>
        */
      );
    }
  }