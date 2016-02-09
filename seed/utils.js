import chalk from 'chalk';
import Q from 'q';

/**
 * Convenience function to push the given set of fixtures into the db
 * using the given service.
 */
export function populateFixtures(fixtures, service) {
    let waiting = [];
    Object.keys(fixtures || []).forEach((key) => {
        waiting.push(service
            .create(fixtures[key])
            .spread((result) => {
                fixtures[key] = result;
                return result;
            })
            .fail((err) => {
                console.log(chalk.red('An error occurred during seeding'));
                throw err;
            }));
    });
    return Q
        .all(waiting)
        .fail((err) => {
            console.log(chalk.red('An error occurred during seeding'));
            throw err;
        });
}