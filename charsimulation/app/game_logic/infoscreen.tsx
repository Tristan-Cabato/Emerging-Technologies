interface Info {
    title: string;
    image: string;
    description: string;
}

const info: Info[] = [
    {
        title: "Character Logic",
        image: "/resources/CharacterMovement.png",
        description: "Every 1200 milliseconds, a randomized vertical and horizontal step is added to the current position of a character, then limited to the boundary."
    },
    {
        title: "Navigation Bar",
        image: "/resources/NavigationBar.png",
        description: "Redraw: Refreshes the 'game screen'\nInfo: Opens this screen\nCurrent Characters: Displays the amount of characters on screen\nVercel: Opens the Vercel repository in another tab\nGitHub: Opens the GitHub repository in another tab"
    },
    {
        title: "Character Interaction",
        image: "/resources/Interaction.png",
        description: "You can drag the character bubbles between the boundaries"
    }
]

export { info }; 