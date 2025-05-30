import Card from 'react-bootstrap/Card';
export default function CandidatesProfile({id, name, account=null, password=null}){
    return(
        <>
            <Card>
                <Card.Header>候選人資訊</Card.Header>
                <Card.Body className='text-start'>
                    <Card.Title>帳號名稱：{name}</Card.Title>
                    <Card.Text>
                        帳號Id：{id}<br/>
                        {account && (
                            <>
                                帳號：{account}<br />
                            </>
                        )}
                        {password && (
                            <>
                                密碼：{password}
                            </>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}