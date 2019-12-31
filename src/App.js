import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  // 데이터 요청
  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    console.log(_results)
    this.setState({results: _results.data})
  }

  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlingSubmit = async (event) => {
    event.preventDefault() // event의 기본 기능(새로고침 등)을 막음
    let result = await api.createPost({title:this.state.title, content:this.state.content})
    console.log("완료!", result)
    this.setState({title:'', content:''})
    this.getPosts()
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="lg">
        <div className="PostingSection">
          <Paper className="PostingPaper">
          <h2>※ 명언, 좋은 말 저장소... ㅎㅎ ※</h2>
          <form className="PostingForm" onSubmit={this.handlingSubmit}>

          <TextField
          id="outlined-multiline-flexible"
          label="title"
          name="title"
          multiline
          rowsMax="4"
          value={this.state.title}
          onChange={this.handlingChange}
          margin="normal"
          variant="outlined"
        />

          <TextField
          id="outlined-multiline-flexible"
          label="content"
          name="content"
          multiline
          rows="4"
          rowsMax="4"
          value={this.state.content}
          onChange={this.handlingChange}
          margin="normal"
          variant="outlined"
        />

          <Button variant="contained" color="primary" onClick={this.handlingSubmit}> ♥ 제출 ♥ </Button>
          </form>
          </Paper>
        </div>

        <div className = "ViewSection">
          {
            this.state.results.map((post)=>

            <Card className={'card'}>
              <CardContent>
                <Typography>
                  <PostView key={post.id} title={post.title} content={post.content}/>
                </Typography>
              </CardContent>
              <CardActions>
               <Button variant="outlined" color="secondary" size="small" value={post.id} onClick={(event)=>this.handlingDelete(post.id)}> 삭제 </Button>
              </CardActions>
            </Card>

            )
          }
        </div>
        </Container>
      </div>
    );
  }
}

export default App;
