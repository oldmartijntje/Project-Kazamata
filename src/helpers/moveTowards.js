export function moveTowards(person, destinationPosition, speed) {
    let distanceToTravelX = destinationPosition.x - person.position.x;
    let distanceToTravelY = destinationPosition.y - person.position.y;

    let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
    if (distance <= speed) {
        // We've arrived, snap to destination
        person.position.x = destinationPosition.x;
        person.position.y = destinationPosition.y;
    } else {
        // snapping back to the grid (for tight corners can otherwise get both an x and y movement at the same time)
        if (Math.abs(distanceToTravelX) <= speed) {
            person.position.x = destinationPosition.x;
        }
        if (Math.abs(distanceToTravelY) <= speed) {
            person.position.y = destinationPosition.y;
        }

        // We still have further to go
        // move towards the destination at the current speed
        let normalizedX = distanceToTravelX / distance;
        let normalizedY = distanceToTravelY / distance;

        person.position.x += normalizedX * speed;
        person.position.y += normalizedY * speed;


        // Recalculate the distance after moving
        distanceToTravelX = destinationPosition.x - person.position.x;
        distanceToTravelY = destinationPosition.y - person.position.y;
        distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
    }

    return distance
}