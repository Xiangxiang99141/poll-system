import Card from 'react-bootstrap/Card';
import {User} from '../class/User'
export default function Profile({id, name, account, password}){
    return(
        <>
            <Card>
                <Card.Header>帳號資訊</Card.Header>
                <Card.Body className='text-start'>
                    <Card.Title>帳號名稱：{name}</Card.Title>
                    <Card.Text>
                        帳號Id：{id}<br/>
                        帳號：{account}<br/>
                        密碼：{password}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}