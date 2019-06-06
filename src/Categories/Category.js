import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as categoriesActions from '../re-actions/categories';
import * as categoriesSelectors from '../re-selectors/categories';


const useStyles = makeStyles({
	card: {
		maxWidth: 345,
	},
});

function Category({category, id}) {
	const { name, description, imgUrl, inventories } = category;
	const classes = useStyles();

	return (
		<Card component={Link} to={`/categories/${id}`} className={classes.card}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					height="140"
					image={imgUrl? imgUrl : "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{description}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{!!inventories && inventories.length} inventories
					</Typography>
				</CardContent>
			</CardActionArea>
			{/* <CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
				<Button size="small" color="primary">
					Learn More
				</Button>
			</CardActions> */}
		</Card>
	);
}

const mapStateToProps = (state, { id }) => ({
	categoriesKeys: categoriesSelectors.getCategoriesKeysState(state),
	category: categoriesSelectors.getCategoryState(state, id),
	categories: state.categories
})

const mapDispatchToProps = dispatch => ({
	categoriesActions: bindActionCreators(categoriesActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Category);
