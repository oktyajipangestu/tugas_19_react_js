import { Component } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      edit: false,
      dataBaru: {
        id: "",
        nama_karyawan: "",
        jabatan: "",
        jenis_kelamin: "laki-laki",
        tanggal_lahir: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearData = this.clearData.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  clearData() {
    this.setState({
      dataBaru: {
        id: "",
        nama_karyawan: "",
        jabatan: "",
        jenis_kelamin: "laki-laki",
        tanggal_lahir: "",
      },
    });
  }

  reloadData() {
    axios.get("http://localhost:3004/data-karyawan").then((res) => {
      this.setState({
        data: res.data,
        edit: false,
      });
    });
  }

  componentDidMount() {
    this.reloadData();
  }

  handleChange(e) {
    let karyawanBaru = { ...this.state.dataBaru };
    if (this.state.edit === false) {
      karyawanBaru["id"] = new Date();
    }
    karyawanBaru[e.target.name] = e.target.value;

    this.setState({
      dataBaru: karyawanBaru,
    });
  }

  handleRemove(e) {
    fetch(`http://localhost:3004/data-karyawan/${e.target.value}`, {
      method: "DELETE",
    }).then((res) => this.reloadData());
  }

  handleUpdate(e) {
    axios
      .get(`http://localhost:3004/data-karyawan/${e.target.value}`)
      .then((res) => {
        this.setState({
          dataBaru: res.data,
        });
      });

    this.setState({
      edit: true,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.edit === false) {
      axios
        .post(`http://localhost:3004/data-karyawan`, this.state.dataBaru)
        .then(() => this.reloadData());

      this.clearData();
    } else {
      console.log(e.target.value)
      axios.put(`http://localhost:3004/data-karyawan/${this.state.dataBaru.id}`, this.state.dataBaru).then(() => this.reloadData());

      this.clearData();
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Row className="mt-3 mb-5">
            <Col className="text-center">
              <h1>Daftar Karyawan</h1>
            </Col>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col}>
              <Form.Label>Nama Karyawan</Form.Label>
              <Form.Control
                type="text"
                value={this.state.dataBaru.nama_karyawan}
                placeholder="Nama Karyawan"
                name="nama_karyawan"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Jabatan</Form.Label>
              <Form.Control
                type="text"
                value={this.state.dataBaru.jabatan}
                placeholder="Jabatan"
                name="jabatan"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                name="jenis_kelamin"
                value={this.state.dataBaru.jenis_kelamin}
                custom
                onChange={this.handleChange}
              >
                <option value="laki-laki">laki-Laki</option>
                <option value="perempuan">Perempuan</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                placeholder="Tanggal Lahir"
                value={this.state.dataBaru.tanggal_lahir}
                name="tanggal_lahir"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-5">
            <Col>
              <Button
                variant="primary"
                type="submit"
                value={this.state.cariData}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nama Karyawan</th>
                    <th>Jabatan</th>
                    <th>Jenis Kelamin</th>
                    <th>Tanggal Lahir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((karyawan, index) => {
                    return (
                      <tr key={index}>
                        <td>{karyawan.nama_karyawan}</td>
                        <td>{karyawan.jabatan}</td>
                        <td>{karyawan.jenis_kelamin}</td>
                        <td>{karyawan.tanggal_lahir}</td>
                        <td>
                          <Button
                            variant="outline-info"
                            className="mr-2"
                            value={karyawan.id}
                            onClick={this.handleUpdate}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={this.handleRemove}
                            value={karyawan.id}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
