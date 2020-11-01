import React, { useState } from "react"
import {
	SwipeableDrawer as Drawer,
	Grid,
	Typography,
	List,
	ListItemIcon,
	ListItemText,
	Button,
} from "@material-ui/core"
import {
	SportsEsports as GameIcon,
	ExitToApp as LogoutIcon,
	GitHub as GithubIcon,
} from "@material-ui/icons"

import {
	Avatar,
	Divider,
} from "@/components"

import Auth from "@/services/auth"

import DeviceUtil from "@/utils/device"

import { useSocketStore } from "@/store/Socket"

import useStyles from "@/components/Menu/styles"
import useCustomStyles from "@/styles/custom"

import GameItem from "@/components/Menu/GameItem"
import ListItem from "@/components/Menu/ListItem"

type MenuProps = {

}

const Menu: React.FC<MenuProps> = (props) => {
	const classes = useStyles()
	const customClasses = useCustomStyles({})

	const socketStore = useSocketStore()

	const [opened, setOpened] = useState(!DeviceUtil.isMobile)

	const handleLogout = () => {
		Auth.logout()
	}

	const handleCloseMenu = () => {
		if (DeviceUtil.isMobile) {
			setOpened(false)
		}
	}

	const handleOpenMenu = () => {
		setOpened(true)
	}

	return (
		<Drawer
			open={opened}
			onClose={handleCloseMenu}
			onOpen={handleOpenMenu}
			variant={DeviceUtil.isMobile ? "temporary" : "permanent"}
			anchor="left"
			PaperProps={{ className: classes.drawerPaper }}
		>
			<Grid
				container
				direction="column"
				justify="space-between"
				className={classes.content}
			>
				<Grid
					container
					direction="column"
				>
					<Grid
						container
						justify="flex-start"
						alignItems="center"
						className={classes.avatarContainer}
					>
						<Avatar
							size="large"
							name={socketStore?.player?.name || ""}
						/>

						<Typography
							variant="h3"
							className={`${classes.avatarName} ${customClasses.limitedName}`}
						>
							{socketStore?.player?.name}
						</Typography>
					</Grid>

					<Divider orientation="horizontal" size={4} />

					<Typography
						variant="h2"
						className={classes.menuTitle}
					>
						PAGES
					</Typography>

					<Divider orientation="horizontal" size={1} />

					<List onClick={handleCloseMenu}>
						<ListItem to="/">
							<ListItemIcon>
								<GameIcon
									fontSize="large"
									className={classes.listItemIcon}
								/>
							</ListItemIcon>
							<ListItemText
								primary="Games"
								primaryTypographyProps={{
									variant: "h3",
									className: classes.listItemText,
								}}
							/>
						</ListItem>
					</List>

					<Divider orientation="horizontal" size={4} />

					<Typography
						variant="h2"
						className={classes.menuTitle}
					>
						LAST GAMES
					</Typography>

					<Divider orientation="horizontal" size={1} />

					<List onClick={handleCloseMenu}>
						{socketStore.gameHistory
						?.sort((a, b) => b.createdAt - a.createdAt)
						.slice(0, 3)
						.map((gameHistory) => (
							<ListItem
								to={`/${gameHistory.gameId}`}
								status={gameHistory.status}
							>
								<GameItem
									playersCount={gameHistory.playersCount}
									name={gameHistory.name}
									status={gameHistory.status}
								/>
							</ListItem>
						))}
					</List>
				</Grid>

				<Grid
					container
					direction="column"
					alignItems="center"
				>
					<Button
						startIcon={<LogoutIcon />}
						className={classes.logoutButton}
						onClick={handleLogout}
					>
						LOGOUT
					</Button>

					<Divider orientation="horizontal" size={1} />

					<Button
						variant="text"
						href="https://github.com/guilhermebkel/uno-game"
						target="_blank"
						startIcon={<GithubIcon />}
						className={classes.githubButton}
					>
						Give us a star on Github
					</Button>
				</Grid>
			</Grid>
		</Drawer>
	)
}

export default Menu
