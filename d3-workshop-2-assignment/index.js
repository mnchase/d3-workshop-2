characters = undefined;
actor_ages = undefined;
actors = undefined;

// handle the data
function handleData (data) {
    // characters don't get handled, we should set them to the first promise in Promise.all
    characters = data[0]
    // actors will get handled, so we initially set the actor_ages to the second promise in Promise.all
    actor_ages = data[1]

    // compute the age of each actor based on their birth dates
    Object.keys(actor_ages).forEach(function(key) {
        actor_ages[key] = getAge(actor_ages[key]);
    })

    // create an actors object where each actor has a name, an age, and the total number of episodes they starred in across all tv shows
    actors = Object.keys(actor_ages).map(function(d){
        return {
            actor: d,
            age: actor_ages[d],
            total_num_episodes: +characters.filter(e => e.played_by.includes(d)).map(e => e.number_of_episodes).reduce((a,c) => a+c)
        }
    })

    makeVisualizations()
}

// load data from characters.json and actors.json
let datafile_promises = Promise.all([
    d3.json('data/characters.json').then(function(data){
        return data.map(row => {
            return {
                name: row.name,
                played_by: row.played_by,
                // convert the number of episodes to a number
                number_of_episodes: +row.number_of_episodes,
                from: row.from
            }
        });
    }),
    d3.json('data/actors.json')
])
datafile_promises.then(handleData);