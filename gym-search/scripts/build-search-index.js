import lunr from 'lunr';
import { getAllExercises } from '../lib/api.js'

const allExercises = getAllExercises([
  'slug',
  'title',
  'excerpt',
  'difficulties',
  'projects',
  'OAs',
]);

await $`echo ${JSON.stringify(allExercises)} > data/all-exercises.json`;

const searchIndex = lunr(function () {
  this.ref('slug')
  this.field('title')
  this.field('excerpt')
  this.field('difficulties')
  this.field('projects')
  this.field('OAs')

  allExercises.forEach(function (doc) {
    this.add(doc)
  }, this)
});

const serializedIdx = JSON.stringify(searchIndex)

await $`echo ${serializedIdx} > data/search-index.json`;

// let branch = await $`git branch --show-current`
// await $`dep deploy --branch=${branch}`

// await Promise.all([
//   $`sleep 1; echo 1`,
//   $`sleep 2; echo 2`,
//   $`sleep 3; echo 3`,
// ])

// let name = 'foo bar'
// await $`mkdir /tmp/${name}`