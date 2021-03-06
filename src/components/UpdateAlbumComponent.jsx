import React, { Component } from 'react'
import AlbumService from '../services/AlbumService';

class UpdateAlbumComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            albumId: this.props.match.params.id,
            albumName: '',
            artistName: '',
            genre: '', 
            releaseYear: ''
        }
        this.changeAlbumNameHandler = this.changeAlbumNameHandler.bind(this);
        this.changeArtistNameHandler = this.changeArtistNameHandler.bind(this);
        this.changeGenreHandler = this.changeGenreHandler.bind(this); 
        this.changeReleaseYearHandler = this.changeReleaseYearHandler.bind(this); 
        this.updateAlbum = this.updateAlbum.bind(this);
    }

    componentDidMount(){
        AlbumService.getAlbumById(this.state.id).then( (res) =>{
            let album = res.data;
            this.setState({
                albumId: this.state.id,
                albumName: album.albumName,
                artistName: album.artistName,
                genre: album.genre, 
                releaseYear: album.releaseYear
            });
        });
    }

    updateAlbum = (e) => {
        e.preventDefault();
        console.log(this.state.id); 
        let album = {
            albumId: this.state.id,
            albumName: this.state.albumName,
            artistName: this.state.artistName,
            genre: this.state.genre, 
            releaseYear: this.state.releaseYear
        };
        console.log('album => ' + JSON.stringify(album));
        console.log('id => ' + JSON.stringify(this.state.id));
        AlbumService.updateAlbum(album).then( res => {
            this.props.history.push('/album-crud-frontend/albums');
        });
    }
    
    changeAlbumNameHandler = (event) => {
        this.setState({albumName: event.target.value});
    }

    changeArtistNameHandler = (event) => {
        this.setState({artistName: event.target.value});
    }

    changeGenreHandler = (event) => {
        this.setState({genre: event.target.value});
    }

    changeReleaseYearHandler = (event) => {
        this.setState({releaseYear: event.target.value});
    }

    cancel(){
        this.props.history.push('/album-crud-frontend/albums');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className="container">
                        <div className="row">
                            <div className="card col-md-6 offset-md-3">
                                <h3 className="text-center">Update Album</h3>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Album Name: </label>
                                            <input placeholder="Album Name" name="albumName" className="form-control" 
                                                value={this.state.albumName} onChange={this.changeAlbumNameHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Artist Name: </label>
                                            <input placeholder="Artist Name" name="artistName" className="form-control" 
                                                value={this.state.artistName} onChange={this.changeArtistNameHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Genre: </label>
                                            <input placeholder="Genre" name="genre" className="form-control" 
                                                value={this.state.genre} onChange={this.changeGenreHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Release Year: </label>
                                            <input placeholder="Release Year" name="releaseYear" className="form-control" 
                                                value={this.state.releaseYear} onChange={this.changeReleaseYearHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateAlbum}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateAlbumComponent