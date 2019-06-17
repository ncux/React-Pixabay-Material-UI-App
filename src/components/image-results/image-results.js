import React, { Component } from 'react';
import { GridList, GridTile } from "material-ui";
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ImageResults extends Component {

    render() {
        let imageList;
        const { images } = this.props;
        console.log(images);
        if(images) {
            imageList = (
                <GridList cols={3}>
                    { images.map(image => (
                        <GridTile
                            key={image.id}
                            title={image.tags}
                            subtitle={<span>by <strong>{image.user}</strong></span>}
                            actionIcon={<IconButton><ZoomIn color="white" /></IconButton>}
                        >
                            <img src={image.largeImageURL} alt={image.tags} />
                        </GridTile>
                    )) }
                </GridList>
            )
        } else {
            imageList = null;
        }

        return (
            <div>
                { imageList }
            </div>
        )
    }
}


export default ImageResults;
