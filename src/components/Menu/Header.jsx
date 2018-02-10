import React from 'react';

const Header = () =>
  <header className='items'>
    <h1 className='items__title'>The Pomodoro</h1>
    <blockquote className='items__description' cite='https://en.wikipedia.org/wiki/Pomodoro_Technique'>
      <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are named pomodoros, the plural in English of the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as a university student.</p>
      <p>The technique has been widely popularized by dozens of apps and websites providing timers and instructions. Closely related to concepts such as timeboxing and iterative and incremental development used in software design, the method has been adopted in pair programming contexts.<cite> - Wikipedia</cite></p>
    </blockquote>
   </header>;

export default Header;
