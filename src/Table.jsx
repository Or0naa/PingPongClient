import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Table() {


    const [players, setPlayers] = useState([])

    useEffect(() => {
        const newData = async () => {
            try {
                const res = await axios.get("http://localhost:3636/play")
                console.log(res.data)
                setPlayers(res.data)
            }
            catch (error) {
                console.log("error")
            }

        }
        newData()
    }, [])


    return (
        <div >
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Games</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                        <tr key={player._id}>
                            <td>{player.player}</td>
                            <td>{player.games}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )
}
