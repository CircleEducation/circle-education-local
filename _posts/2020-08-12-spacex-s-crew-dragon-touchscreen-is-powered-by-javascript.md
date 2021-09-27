---
tags: []
layout: post
title: 'Code in Space: SpaceX’s Crew Dragon Touchscreen is powered by JavaScript'
description: SpaceX engineers shared the programming languages they code in are C
  & C++ for flight software, HTML, JavaScript & CSS for displays and Python for testing,
  adding that they use HTML, JavaScript & CSS. They use Web Components heavily.
created_at: 2020-08-11T00:00:00.000-05:00
updated_at: 2020-08-11T01:00:00.000-05:00
categories: []
excerpt: SpaceX engineers shared the programming languages they code in are C & C++
  for flight software, HTML, JavaScript & CSS for displays and Python for testing,
  adding that they use HTML, JavaScript & CSS. They use Web Components heavily.
redirect_from: []
permalink: "/blog/code-in-space/"
canonical_link: ''
author_name: Zollege
author_email: info@zollege.com
school_keys:
- circlecoding
- lubbockcodingacademy
- austincodingacademy
- texastechcodingacademy
img: "/assets/uploads/untitled-design-2-1.webp"

---
# SpaceX’s Crew Dragon Touchscreen is powered by JavaScript

## Find out more about the tech stack powering Crew Dragon’s Chromium Interface

\*Original publication can be found on Medium - written by [Bilal Rifas](https://medium.com/@bilal.rifas?source=post_page-----cbc5a6781570----------------------)

[https://medium.com/javascript-in-plain-english/spacexs-crew-dragon-touchscreen-is-powered-by-javascript-cbc5a6781570](https://medium.com/javascript-in-plain-english/spacexs-crew-dragon-touchscreen-is-powered-by-javascript-cbc5a6781570 "https://medium.com/javascript-in-plain-english/spacexs-crew-dragon-touchscreen-is-powered-by-javascript-cbc5a6781570")

The mission is known as Demo-2, NASA Astronauts Robert “Bob” Behnken and Douglas “Doug” Hurley traveled aboard Dragon a top a Falcon 9 rocket, which lifted off from Launch Pad 39A at the Kennedy Space Center in Cape Canaveral, Florida.

The aerospace company designs and manufactures some of the world’s most innovative spacecraft featuring modern technology. SpaceX’s Falcon 9 rocket is the only rocket in the industry that is capable of returning from space. It conducts a controlled vertical landing on autonomous drone ships at sea. Dragon is capable of operating with full autonomy in space. It can also detect if the Falcon 9 rocket malfunctions midflight to conduct an escape.

All of this is achieved through software created by teams of engineers who code programs to operate the spacecraft.

# Dragon Spacecraft’s Cockpit

The Dragon spacecraft’s cockpit consists of a trio of touchscreens. NASA Astronauts Behnken and Hurley tested the software during their recent voyage to the Space Station. The craft only has a few buttons that are to trigger emergency operations. Dragon’s displays provide real-time information on anything from its position in space, to possible destinations, and the environment onboard. A simple tap on a screen is capable of igniting Dragon’s integrated space thrusters to alter the craft’s direction.

![](/assets/uploads/space1.webp)

Photo by [SpaceX](https://unsplash.com/@spacex?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

SpaceX engineers shared the programming languages they code in are C & C++ for flight software, HTML, JavaScript & CSS for displays and Python for testing, adding that they use HTML, JavaScript & CSS. They use Web Components heavily.

It’s known that Crew Dragon displays are running Chromium and JS. Is it using a reactive library, and if so, is that developed in-house or is it an existing library/framework?

> _Yes, they use Chromium and they do use a reactive library that they developed in house._

![](/assets/uploads/space2.webp)

Photo by [SpaceX](https://unsplash.com/@spacex?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

Then a similar question will arise for us too, which the engineering team elaborated That they have to understand that Chromium in this context is used as a UI rendering engine only. The Flight Software interaction layer with the displays and the fault-tolerant is well defined and resides outside the displays boundary.

They have said that they follow the same development process for all vehicle code regardless of the technology stack. They cross-train their developers to write vehicle code in C++ and to carry the same mentality toward writing reliable software.

They take reliability & performance very seriously, and just like other vehicle software, they have tested extensively under different conditions to understand all failure modes. They have alerts & procedures in place to act on those failures in case they encounter them. All of that added to hundreds of hours of simulations that they run on flight hardware to train the crew.

# Is the Docking Simulator developed by the Crew Displays Software Team itself?

![](/assets/uploads/space3.webp)

Photo by [SpaceX](https://unsplash.com/@spacex?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

SpaceX engineer Jeff replied stated that “The docking simulator is completely separate code from what’s actually in the Crew displays, though it was developed by their Crew displays team. It started out as a fun project from Shane Mielke and Mike Westenhaver before they decided to finish it up and put it on the web before Demo-2.”

![](/assets/uploads/space4.gif)

Gif by [SpaceX](https://www.spacex.com/) on [SpaceX](https://www.spacex.com/)

The Dragon simulator is a fun online game, to pilot the spacecraft manually to dock it to the International Space Station. The company says the simulator is similar to what NASA astronauts used to train for the historic mission.

In some shots of mission control, it’s noticeable that UI is very similar to the displays in Crew Dragon. Can the exact same crew display software be served from a server on the ground, feeding off of live telemetry from Dragon while in flight? If so, can this software be used to monitor Cargo Dragon as well on future flights?

SpaceX Engineer Jeff responded that “They can and do run the exact same code that’s on the Crew displays on the ground. The only limitation is that they don’t necessarily get all of the same telemetry that they have in the cockpit on the ground due to limitations in our RF budget. They could but they generalize prioritize getting other critical telemetry instead.”

![](/assets/uploads/space5.webp)

Photo by [SpaceX](https://unsplash.com/@spacex?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

In the future, the Crew Display team will share some high-resolution screenshots of the Crew displays, once they get approved from a higher authority. So they can show what Bob and Doug were able to see up close.