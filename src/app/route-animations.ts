import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [animate('500ms ease', style({ opacity: 1, transform: 'scale(1)' }))],
      { optional: true }
    ),
  ]),
]);
