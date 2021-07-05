import { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  reloadData() {
    axios.get("http://localhost:3004/data-karyawan").then((res) => {
      this.setState({
        data: res.data,
      });
    })
  }

  componentDidMount() {
    this.reloadData();
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Karyawan</Form.Label>
                  <Form.Control type="text" placeholder="Nama Karyawan" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Control type="text" placeholder="Jabatan" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <br />
                  <select>
                    <option value="laki-laki">Laki-laki</option>
                    <option value="perempuan">Perempuan</option>
                  </select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control type="date" placeholder="Tanggal Lahir" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>

            <Col>
              {this.state.data.map((data,index) => {
                return (
                  <div key={index}>
                  <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{data.nama_karyawan}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{data.jabatan}</ListGroupItem>
                    <ListGroupItem>{data.jenis_kelamin}</ListGroupItem>
                    <ListGroupItem>{data.jabatan}</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Hapus</Card.Link>
                    <Card.Link href="#">Edit</Card.Link>
                  </Card.Body>
                </Card>
                </div>
                );
              })}
              
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
