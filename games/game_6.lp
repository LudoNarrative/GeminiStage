% lecture_scrubMode_18.lp
label(entity(e_1_XX_),e1).
label(entity(e_2_XX_),e(2)).
label(resource(r_1_XX_),r(1),private).

entity(e_1_XX_).
entity(e_2_XX_).

resource(r_1_XX_).

singular(entity(e_2_XX_)).

many(entity(e_1_XX_)).

initialize(set_value(resource(r_1_XX_),scalar(0))).
initialize(fill(location(top,left),blue)).
initialize(set_draggable(entity(e_1_XX_),true)).
initialize(add(entity(e_1_XX_),scalar(1),location(bottom,left))).
initialize(add(entity(e_1_XX_),scalar(1),location(top,center))).
initialize(add(entity(e_1_XX_),scalar(1),location(bottom,right))).
initialize(add(entity(e_2_XX_),scalar(1),location(middle,center))).
initialize(set_color(entity(e_1_XX_),red)).
initialize(set_sprite(entity(e_1_XX_),triangle)).
initialize(set_sprite(entity(e_2_XX_),triangle)).
initialize(set_color(entity(e_2_XX_),blue)).

controlLogic(draggable(entity(e_1_XX_))).

timer_logic(timer(t_1_XX_),scalar(7),loop).
timer_logic(timer(behavior_condition_polarity_entity_e_2_XX__XX__X_wander_X_tick_XX_),scalar(7),loop).

pool(entity(e_1_XX_),location(top,left),random,random).
pool(entity(e_1_XX_),location(top,center),random,random).
pool(entity(e_1_XX_),location(top,right),random,random).
pool(entity(e_1_XX_),location(middle,left),random,random).
pool(entity(e_1_XX_),location(middle,center),random,random).
pool(entity(e_1_XX_),location(middle,right),random,random).
pool(entity(e_1_XX_),location(bottom,left),random,random).
pool(entity(e_1_XX_),location(bottom,center),random,random).
pool(entity(e_1_XX_),location(bottom,right),random,random).
pool(entity(e_2_XX_),location(top,left),random,random).
pool(entity(e_2_XX_),location(top,center),random,random).
pool(entity(e_2_XX_),location(top,right),random,random).
pool(entity(e_2_XX_),location(middle,left),random,random).
pool(entity(e_2_XX_),location(middle,center),random,random).
pool(entity(e_2_XX_),location(middle,right),random,random).
pool(entity(e_2_XX_),location(bottom,left),random,random).
pool(entity(e_2_XX_),location(bottom,center),random,random).
pool(entity(e_2_XX_),location(bottom,right),random,random).

boundary(closed).

initialize(set_value(resource(r_1_XX_),scalar(0))).
initialize(set_value(resource(r_1_XX_),scalar(1))).

precondition(timer_elapsed(t_1_XX_),outcome(o_1_XX_)).
result(outcome(o_1_XX_),draw(entity(e_2_XX_),blue)).
result(outcome(o_1_XX_),add(entity(e_1_XX_),scalar(1),pool(entity(e_1_XX_)))).

precondition(timer_elapsed(behavior_condition_polarity_entity_e_2_XX__XX__X_wander_X_tick_XX_),outcome(o_2_XX_)).
result(outcome(o_2_XX_),add(entity(e_1_XX_),scalar(1),pool(entity(e_1_XX_)))).
result(outcome(o_2_XX_),rotate_to(entity(e_2_XX_),random_int(scalar(0),scalar(360)))).

precondition(control_event(click(entity(e_2_XX_))),outcome(o_3_XX_)).
result(outcome(o_3_XX_),add(entity(e_1_XX_),scalar(1),pool(entity(e_1_XX_)))).

precondition(overlaps(entity(e_1_XX_),entity(e_2_XX_),true),outcome(o_4_XX_)).
result(outcome(o_4_XX_),clear(entity(e_1_XX_))).
result(outcome(o_4_XX_),delete(entity(e_1_XX_))).

precondition(ge(amount(blue),scalar(9)),outcome(o_5_XX_)).
result(outcome(o_5_XX_),mode_change(game_loss)).

precondition(tick,tick).
result(tick,apply_restitution(entity(e_2_XX_),entity(e_2_XX_))).
result(tick,apply_restitution(entity(e_1_XX_),entity(e_1_XX_))).
result(tick,set_value(resource(r_1_XX_),amount(clear))).
result(tick,draw(cursor,blue)).
result(tick,decrease_over_time(property(entity(e_1_XX_),health),scalar(5))).
result(tick,increase_over_time(property(entity(e_1_XX_),health),scalar(4))).
result(tick,moves(entity(e_2_XX_),forward,resource(r_1_XX_))).

reading(consumes,relation(entity(e_2_XX_),entity(e_1_XX_))).
reading(goal(reduce),blue).
reading(bad,blue).
reading(bad,tick).
reading(bad,outcome(o_1_XX_)).
reading(good,outcome(o_4_XX_)).
reading(hand_eye_coordination,game).
reading(help,relation(entity(e_2_XX_),player)).
==========
With labels:

Red triangles can be dragged around with the mouse.

Every 7 seconds,
  the blue triangle draws blue
  a red triangle appears

Every 7 seconds,
  a red triangle appears
  the blue triangle rotates to a random direction

When the blue triangle is clicked,
  a red triangle appears

When a red triangle overlaps a blue triangle,
  the color behind the red triangle is erased
  a red triangle (which?) disappears

When the amount of blue is greater than 9,
  the game is lost

Every tick,
  overlapping blue triangles are separated
  overlapping red triangles are separated,
  the value of resource 1 is set to the amount of clear on the screen
  blue is drawn under the cursor
  the red triangle's (which?) health decreases over time by 5
  the red triangle's (which?) health increases over time by 4
  the blue triangle moves forward by an amount equal to resource 1

==========
Without labels:

Red triangles can be dragged around with the mouse.

Every 7 seconds,
  the blue triangle draws blue
  a red triangle appears

Every 7 seconds,
  a red triangle appears
  the blue triangle rotates to a random direction

When the blue triangle is clicked,
  a red triangle appears

When a red triangle overlaps a blue triangle,
  the color behind the red triangle is erased
  a red triangle (which?) disappears

When the amount of blue is greater than 9,
  the game is lost

Every tick,
  overlapping blue triangles are separated
  overlapping red triangles are separated,
  the value of resource 1 is set to the amount of clear on the screen
  blue is drawn under the cursor
  the red triangle's (which?) health decreases over time by 5
  the red triangle's (which?) health increases over time by 4
  the blue triangle moves forward by an amount equal to resource 1
