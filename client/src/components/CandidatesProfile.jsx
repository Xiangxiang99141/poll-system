import {Card,Image,Badge} from 'react-bootstrap';
export default function CandidatesProfile({id=null, name, account=null, password=null,politics,imageUrl='./default-photo.jpg',voteCount=0}){
    return(
        <>
            <Card>
                <Card.Header>
                    候選人資訊
                </Card.Header>
                <Card.Body className='text-start'>
                    <div className="d-flex justify-content-center">
                        <Image
                            src={imageUrl}
                            roundedCircle
                            style={{ width: "200px", height: "200px", objectFit: "cover"}}
                            alt={name}
                            className='mb-3'
                        />
                    </div>
                    <Card.Title>姓名：{name}</Card.Title>
                    <Card.Text>
                        {
                            id && (
                                    <>
                                        帳號Id：{id}<br/>
                                    </>
                                )
                        }
                        
                        {account && (
                            <>
                                帳號：{account}<br />
                            </>
                        )}
                        {password && (
                            <>
                                密碼：{password}<br />
                            </>
                        )}
                        票數：<Badge bg="primary">{voteCount}</Badge>
                    </Card.Text>
                    <Card.Footer>
                        政見：{politics}
                    </Card.Footer>
                </Card.Body>
            </Card>
        </>
    )
}