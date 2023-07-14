import type { Quaternion } from './types';
import conjugate from './conjugate';
import multiply from './multiply';

export default (q: Quaternion, p: Quaternion): Quaternion => multiply(multiply(conjugate(q), p), q);
