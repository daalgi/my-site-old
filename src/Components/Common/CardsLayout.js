import React from 'react'


const CardsLayout = ({ cards, CardComponent, classes }) =>
    <section className={classes.cardsLayout}>
        {cards.map((card, index) =>
            <CardComponent
                key={index}
                {...card}
                classes={classes}
            />
        )}
    </section>

export default CardsLayout