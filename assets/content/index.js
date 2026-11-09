/* Course registry: modules (lessons) + question bank. */
import m1 from './modules/m1.js';
import m2 from './modules/m2.js';
import m3 from './modules/m3.js';
import m3b from './modules/m3b.js';
import m4 from './modules/m4.js';
import m5 from './modules/m5.js';
import q1 from './questions/m1.js';
import q2 from './questions/m2.js';
import q3 from './questions/m3.js';
import q3b from './questions/m3b.js';
import q4 from './questions/m4.js';
import q5 from './questions/m5.js';

export const MODULES = [m1, m2, m3, m3b, m4, m5];
export const QUESTIONS = [...q1, ...q2, ...q3, ...q3b, ...q4, ...q5];
export const QBYID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));

/* Old/short topic names used by the Overview → module slug */
export const TOPIC_ALIAS = {
  anatomy: 'foundations', foundations: 'foundations',
  engine: 'engine',
  'fuel-ignition': 'fuel', fuel: 'fuel', electrical: 'electrics', electrics: 'electrics', ignition: 'electrics',
  chassis: 'drivetrain-chassis', drivetrain: 'drivetrain-chassis', 'drivetrain-chassis': 'drivetrain-chassis',
  electric: 'electric',
};
