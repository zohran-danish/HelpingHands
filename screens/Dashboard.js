import React, { Component } from 'react';
import {
	Container,
	Header,
	Content,
	Footer,
	FooterTab,
	Button,
	Icon,
	Text,
	Title,
	Left,
	Right,
	Body,
	Card,
	CardItem
} from 'native-base';
export default class Dashboard extends Component {
	render() {
		return (
			<Container>
				<Header>
					<Body>
					</Body>
					<Right />
				</Header>
				<Content padder>
					<Card>
						<CardItem>
							<Body>
								<Text>Chat App to talk some awesome people!</Text>
							</Body>
						</CardItem>
					</Card>
					<Button
						full
						rounded
						dark
						style={{ marginTop: 10 }}
						onPress={() => this.props.navigation.navigate('Chat')}
					>
						<Text>Chat With People</Text>
					</Button>
					<Button
						full
						rounded
						primary
						style={{ marginTop: 10 }}
						onPress={() => this.props.navigation.navigate('Profile')}
					>
						<Text>Goto Profiles</Text>
					</Button>
				</Content>
				<Footer>
					<FooterTab>
						<Button vertical onPress={() => this.props.navigation.navigate('Settings')}>
							<Icon name="apps" />
							<Text>Apps</Text>
						</Button>
						<Button vertical>
							<Icon name="camera" />
							<Text>Camera</Text>
						</Button>
						<Button vertical active>
							<Icon active name="navigate" />
							<Text>Navigate</Text>
						</Button>
						<Button vertical>
							<Icon name="person" />
							<Text>Contact</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}
