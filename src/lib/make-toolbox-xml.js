const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px


const quadcopter = function (isStage, targetId){ //modified_by_Yaroslav  //quadcopter category

  return `
  <category name="Quadcopter" colour="#FF0000" secondaryColour="#FF0000">
      ${isStage ? `
      <label text="Stage selected: no quadcopter blocks"></label>
      ` : `

      <block type="copter_fly_up">

      </block>

      <block type="copter_land">

      </block>

      <block type="copter_stop">

      </block>

      <block type="copter_status">

      </block>

      <block type="copter_fly_distance">
          <value name="CENTIMETERS">
              <shadow type="math_number">
                  <field name="NUM">10</field>
              </shadow>
          </value>
      </block>

      <block type="copter_fly_time">
          <value name="SECONDS">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
      </block>

      <block type="copter_fly_for_time_with_speed">
          <value name="SECONDS">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
          <value name="X_SPEED">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
          <value name="Y_SPEED">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>

      </block>



      <block type="copter_change_x_by">
          <value name="DISTANCE_DELTA">
              <shadow type="math_number">
                  <field name="NUM">10</field>
              </shadow>
          </value>
      </block>

      <block type="copter_change_y_by">
          <value name="DISTANCE_DELTA">
              <shadow type="math_number">
                  <field name="NUM">10</field>
              </shadow>
          </value>
      </block>

      <block type="copter_change_z_by">
          <value name="DISTANCE_DELTA">
              <shadow type="math_number">
                  <field name="NUM">10</field>
              </shadow>
          </value>
      </block>

      <block type="copter_x_coord">

      </block>

      <block type="copter_y_coord">

      </block>

      <block type="copter_z_coord">

      </block>

      <block type="copter_fly_for_seconds_to_coords">
          <value name="SECONDS">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
          <value name="X_COORD">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
          <value name="Y_COORD">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
          <value name="Z_COORD">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>

      <block type="copter_fly_to_coords">
        <value name="X_COORD">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
          <value name="Y_COORD">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
          <value name="Z_COORD">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>

      <block type="copter_rotate">
        <value name="DEGREES">
              <shadow type="math_number">
                  <field name="NUM">180</field>
              </shadow>
          </value>

      </block>

      <block type="copter_set_direction">
      <value name="DIRECTION">
          <shadow type="copter_directions"/>
      </value>

      </block>

      <block type="copter_direction">

      </block>

      `}
      ${categorySeparator}
  </category>
  `;



}

const laboratory  = function (isStage, targetId,isExternalSensorsActivated) {  //modified_by_Yaroslav  //laboratory category

  return `
  <category name="Laboratory" colour="#AAAAAA" secondaryColour="#AAAAAA">
      ${isStage ? `
      <label text="Stage selected: no laboratory blocks"></label>
      ` : `

      <block type="lab_led_turn_on">
          <value name="LED_NUMS">
              <shadow type="led_nums"/>
          </value>
      </block>

      <block type="lab_led_turn_off">
          <value name="LED_NUMS">
              <shadow type="led_nums"/>
          </value>
      </block>

      <block type="lab_color_led_turn_on">
          <value name="LED_COLORS">
              <shadow type="led_colors"/>
          </value>
      </block>

      <block type="lab_color_led_turn_off">
          <value name="LED_COLORS">
              <shadow type="led_colors"/>
          </value>
      </block>

      <block type="lab_play_note">
          <value name="LAB_NOTE">
              <shadow type="math_number">
                  <field name="NUM">48</field>
              </shadow>
          </value>
      </block>



      <block type="lab_sensor">
          <value name="LAB_SENSOR">
              <shadow type="lab_sensors"/>
          </value>
      </block>

      <block type="lab_button_pressed">
          <value name="BUTTON_NUMBER">
              <shadow type="button_numbers"/>
          </value>
      </block>

        ${isExternalSensorsActivated?

          ` <block type="lab_external_sensor">
                <value name="LAB_EXTERNAL_SENSOR">
                    <shadow type="lab_external_sensors"/>
                </value>
            </block>

            `:``

        }

        ${blockSeparator}

        <block type="lab_analog_pin">
              <value name="LAB_ANALOG_PIN">
                  <shadow type="lab_analog_pins"/>
              </value>
          </block>

          <block type="lab_digital_pin">
                <value name="LAB_DIGITAL_PIN">
                    <shadow type="lab_digital_pins_stack1"/>
                </value>
            </block>

            <block type="lab_digital_pin_set_on_off">
                <value name="LAB_DIGITAL_PIN">
                    <shadow type="lab_digital_pins_stack2"/>
                </value>
                <value name="LAB_DIGITAL_PIN_STATE">
                    <shadow type="lab_digital_pins_states"/>
                </value>

            </block>

            <block type="lab_digital_pin_set_pwm_value">
                <value name="LAB_DIGITAL_PIN">
                    <shadow type="lab_digital_pins_stack2"/>
                </value>
                <value name="PWM_VALUE">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>

            </block>

      `}
      ${categorySeparator}
  </category>
  `;

}

const robot  = function (isStage, targetId,isExtensionPackActivated) {  //modified_by_Yaroslav  //robot category

  return `
  <category name="Robot" colour="#00AF41" secondaryColour="#00AF41">
      ${isStage ? `
      <label text="Stage selected: no robot blocks"></label>
      ` : `
      <block type="robot_motors_on_for_seconds">
          <value name="SECONDS">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
      </block>

      <block type="robot_motors_on">

      </block>


      <block type="robot_motors_off">

      </block>

      <block type="robot_set_direction_to">
          <value name="ROBOT_DIRECTION">
              <shadow type="robot_directions"/>
          </value>
      </block>

      ${blockSeparator}

      <block type="robot_motors_on_for_steps">
          <value name="STEPS">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
      </block>


      <block type="robot_reset_trip_meters">

      </block>


      ${blockSeparator}

      <block type="robot_turnright">
          <value name="DEGREES">
              <shadow type="math_number">
                  <field name="NUM">15</field>
              </shadow>
          </value>
      </block>
      <block type="robot_turnleft">
          <value name="DEGREES">
              <shadow type="math_number">
                  <field name="NUM">15</field>
              </shadow>
          </value>
      </block>

        ${blockSeparator}

        <block type="robot_set_motors_power">
            <value name="POWER">
                <shadow type="math_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
        </block>

        <block type="robot_set_motors_power_left_right_separately">
            <value name="POWER_LEFT">
                <shadow type="math_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
            <value name="POWER_RIGHT">
                <shadow type="math_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
        </block>

        <block type="robot_set_motors_left_right_power_and_direction_separately">
            <value name="ROBOT_LEFT_MOTOR_DIRECTION">
                <shadow type="robot_one_motor_directions"/>
            </value>
            <value name="ROBOT_RIGHT_MOTOR_DIRECTION">
                <shadow type="robot_one_motor_directions"/>
            </value>
            <value name="POWER_LEFT">
                <shadow type="math_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
            <value name="POWER_RIGHT">
                <shadow type="math_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
        </block>

        ${blockSeparator}

        <block type="robot_get_sensor_data">
            <value name="ROBOT_SENSORS">
                <shadow type="robot_sensors"/>
            </value>
        </block>

        ${isExtensionPackActivated?

          `<block type="robot_get_rgb_sensor_data">
              <value name="ROBOT_SENSORS_FOR_RGB">
                  <shadow type="robot_sensors_for_rgb"/>
              </value>
              <value name="RGB_VALUES">
                  <shadow type="rgb_values"/>
              </value>
          </block>`:``



        }



        <block type="robot_start_button_pressed">

        </block>

        ${blockSeparator}

        <block type="robot_turn_led_on">
            <value name="ROBOT_POSITION">
                <shadow type="robot_positions"/>
            </value>
        </block>

        <block type="robot_turn_led_off">
            <value name="ROBOT_POSITION">
                <shadow type="robot_positions"/>
            </value>
        </block>

        ${blockSeparator}

        ${isExtensionPackActivated?

          `<block type="robot_claw_closed">
                <value name="CLAW_CLOSED_PERCENT">
                    <shadow type="math_number">
                        <field name="NUM">15</field>
                    </shadow>
                </value>
            </block>

            <block type="robot_claw_state">
                <value name="CLAW_STATES">
                    <shadow type="claw_states"/>
                </value>
            </block>`:``

        }



      `}
      ${categorySeparator}
  </category>
  `;

}

const motion = function (isStage, targetId) {
    return `
    <category name="Motion" colour="#4C97FF" secondaryColour="#3373CC">
        ${isStage ? `
        <label text="Stage selected: no motion blocks"></label>
        ` : `
        <block type="motion_movesteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_gotoxy">
            <value name="X">
                <shadow id="movex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="movey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_goto">
            <value name="TO">
                <shadow type="motion_goto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_glidesecstoxy">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="X">
                <shadow id="glidex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="glidey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_glideto" id="motion_glideto">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="motion_glideto_menu">
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_pointindirection">
            <value name="DIRECTION">
                <shadow type="math_angle">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        <block type="motion_pointtowards">
            <value name="TOWARDS">
                <shadow type="motion_pointtowards_menu">
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_changexby">
            <value name="DX">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_setx">
            <value name="X">
                <shadow id="setx" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_changeyby">
            <value name="DY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_sety">
            <value name="Y">
                <shadow id="sety" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_ifonedgebounce"/>
        ${blockSeparator}
        <block type="motion_setrotationstyle"/>
        ${blockSeparator}
        <block id="${targetId}_xposition" type="motion_xposition"/>
        <block id="${targetId}_yposition" type="motion_yposition"/>
        <block id="${targetId}_direction" type="motion_direction"/>`}
        ${categorySeparator}
    </category>
    `;
};

const looks = function (isStage, targetId) {
    return `
    <category name="Looks" colour="#9966FF" secondaryColour="#774DCB">
        ${isStage ? '' : `
        <block type="looks_sayforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">Hello!</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_say">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">Hello!</field>
                </shadow>
            </value>
        </block>
        <block type="looks_thinkforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">Hmm...</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_think">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">Hmm...</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        `}
        ${isStage ? `
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops"/>
                </value>
            </block>
            <block type="looks_switchbackdroptoandwait">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops"/>
                </value>
            </block>
            <block type="looks_nextbackdrop"/>
        ` : `
            <block type="looks_switchcostumeto">
                <value name="COSTUME">
                    <shadow type="looks_costume"/>
                </value>
            </block>
            <block type="looks_nextcostume"/>
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops"/>
                </value>
            </block>
            <block type="looks_nextbackdrop"/>
            ${blockSeparator}
            <block type="looks_changesizeby">
                <value name="CHANGE">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_setsizeto">
                <value name="SIZE">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
        `}
        ${blockSeparator}
        <block type="looks_changeeffectby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
        </block>
        <block type="looks_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_cleargraphiceffects"/>
        ${blockSeparator}
        <block type="looks_show"/>
        <block type="looks_hide"/>
        ${blockSeparator}
        ${isStage ? '' : `
            <block type="looks_gotofrontback"/>
            <block type="looks_goforwardbackwardlayers">
                <value name="NUM">
                    <shadow type="math_integer">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            ${blockSeparator}
        `}
        ${isStage ? `
            <block id="backdropnumbername" type="looks_backdropnumbername"/>
        ` : `
            <block id="${targetId}_costumenumbername" type="looks_costumenumbername"/>
            <block id="backdropnumbername" type="looks_backdropnumbername"/>
            <block id="${targetId}_size" type="looks_size"/>
        `}
        ${categorySeparator}
    </category>
    `;
};

const sound = function () {
    return `
    <category name="Sound" colour="#D65CD6" secondaryColour="#BD42BD">
        <block type="sound_play">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"/>
            </value>
        </block>
        <block type="sound_playuntildone">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"/>
            </value>
        </block>
        <block type="sound_stopallsounds"/>
        ${blockSeparator}
        <block type="sound_changeeffectby">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="sound_cleareffects"/>
        ${blockSeparator}
        <block type="sound_changevolumeby">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">-10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_setvolumeto">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block id="volume" type="sound_volume"/>
        ${categorySeparator}
    </category>
    `;
};

const events = function () {
    return `
    <category name="Events" colour="#FFD500" secondaryColour="#CC9900">
        <block type="event_whenflagclicked"/>
        <block type="event_whenkeypressed">
        </block>
        <block type="event_whenthisspriteclicked"/>
        <block type="event_whenbackdropswitchesto">
        </block>
        ${blockSeparator}
        <block type="event_whengreaterthan">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="event_whenbroadcastreceived">
        </block>
        <block type="event_broadcast">
            <value name="BROADCAST_INPUT">
                <shadow type="event_broadcast_menu"></shadow>
            </value>
        </block>
        <block type="event_broadcastandwait">
            <value name="BROADCAST_INPUT">
              <shadow type="event_broadcast_menu"></shadow>
            </value>
        </block>
        ${categorySeparator}
    </category>
    `;
};

const control = function (isStage) {
    return `
    <category name="Control" colour="#FFAB19" secondaryColour="#CF8B17">
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_positive_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block id="forever" type="control_forever"/>
        ${blockSeparator}
        <block type="control_if"/>
        <block type="control_if_else"/>
        <block id="wait_until" type="control_wait_until"/>
        <block id="repeat_until" type="control_repeat_until"/>
        ${blockSeparator}
        <block type="control_stop"/>
        ${blockSeparator}
        ${isStage ? `
            <block type="control_create_clone_of">
                <value name="CLONE_OPTION">
                    <shadow type="control_create_clone_of_menu"/>
                </value>
            </block>
        ` : `
            <block type="control_start_as_clone"/>
            <block type="control_create_clone_of">
                <value name="CLONE_OPTION">
                    <shadow type="control_create_clone_of_menu"/>
                </value>
            </block>
            <block type="control_delete_this_clone"/>
        `}
        ${categorySeparator}
    </category>
    `;
};

const sensing = function (isStage) {
    return `
    <category name="Sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
        ${isStage ? '' : `
            <block type="sensing_touchingobject">
                <value name="TOUCHINGOBJECTMENU">
                    <shadow type="sensing_touchingobjectmenu"/>
                </value>
            </block>
            <block type="sensing_touchingcolor">
                <value name="COLOR">
                    <shadow type="colour_picker"/>
                </value>
            </block>
            <block type="sensing_coloristouchingcolor">
                <value name="COLOR">
                    <shadow type="colour_picker"/>
                </value>
                <value name="COLOR2">
                    <shadow type="colour_picker"/>
                </value>
            </block>
            <block type="sensing_distanceto">
                <value name="DISTANCETOMENU">
                    <shadow type="sensing_distancetomenu"/>
                </value>
            </block>
            ${blockSeparator}
        `}
        <block id="askandwait" type="sensing_askandwait">
            <value name="QUESTION">
                <shadow type="text">
                    <field name="TEXT">What's your name?</field>
                </shadow>
            </value>
        </block>
        <block id="answer" type="sensing_answer"/>
        ${blockSeparator}
        <block type="sensing_keypressed"/>
        <block type="sensing_mousedown"/>
        <block type="sensing_mousex"/>
        <block type="sensing_mousey"/>
        ${isStage ? '' : `
            ${blockSeparator}
            '<block type="sensing_setdragmode" id="sensing_setdragmode"></block>'+
            ${blockSeparator}
        `}
        ${blockSeparator}
        <block id="loudness" type="sensing_loudness"/>
        ${blockSeparator}
        <block id="timer" type="sensing_timer"/>
        <block type="sensing_resettimer"/>
        ${blockSeparator}
        <block id="of" type="sensing_of">
            <value name="OBJECT">
                <shadow id="sensing_of_object_menu" type="sensing_of_object_menu"/>
            </value>
        </block>
        ${blockSeparator}
        <block id="current" type="sensing_current"/>
        <block type="sensing_dayssince2000"/>
        ${categorySeparator}
    </category>
    `;
};

const operators = function () {
    return `
    <category name="Operators" colour="#40BF4A" secondaryColour="#389438">
        <block type="operator_add">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_subtract">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_multiply">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_divide">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_random">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
        </block>
        <block type="operator_gt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_and"/>
        <block type="operator_or"/>
        <block type="operator_not"/>
        ${blockSeparator}
        <block type="operator_join">
            <value name="STRING1">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
            <value name="STRING2">
                <shadow type="text">
                    <field name="TEXT">world</field>
                </shadow>
            </value>
        </block>
        <block type="operator_letter_of">
            <value name="LETTER">
                <shadow type="math_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">world</field>
                </shadow>
            </value>
        </block>
        <block type="operator_length">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">world</field>
                </shadow>
            </value>
        </block>
        <block type="operator_contains" id="operator_contains">
          <value name="STRING1">
            <shadow type="text">
              <field name="TEXT">hello</field>
            </shadow>
          </value>
          <value name="STRING2">
            <shadow type="text">
              <field name="TEXT">world</field>
            </shadow>
          </value>
        </block>
        ${blockSeparator}
        <block type="operator_mod">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_round">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_mathop">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
    </category>
    `;
};

const variables = function () {
    return `
    <category name="Variables" colour="#FF8C1A" secondaryColour="#DB6E00" custom="VARIABLE">
    </category>
    `;
};

const myBlocks = function () {
    return `
    <category name="My Blocks" colour="#FF6680" secondaryColour="#FF4D6A" custom="PROCEDURE">
    </category>
    `;
};

const xmlOpen = '<xml style="display: none">';
const xmlClose = '</xml>';

/**
 * @param {!boolean} isStage - Whether the toolbox is for a stage-type target.
 * @param {?string} targetId - The current editing target
 * @param {string?} categoriesXML - null for default toolbox, or an XML string with <category> elements.
 * @returns {string} - a ScratchBlocks-style XML document for the contents of the toolbox.
 */
const makeToolboxXML = function (isStage, targetId, isExtensionPackActivated, isExternalSensorsActivated,categoriesXML) {
    const gap = [categorySeparator];

  //  const isExternalSensorsActivated = true; //modified_by_Yaroslav

    const everything = [
        xmlOpen,
        quadcopter(isStage, targetId), gap, //modified_by_Yaroslav
        laboratory(isStage, targetId,isExternalSensorsActivated),gap, //modified_by_Yaroslav
        robot(isStage, targetId,isExtensionPackActivated),gap, //modified_by_Yaroslav //toolbox generator main
        motion(isStage, targetId), gap,
        looks(isStage, targetId), gap,
        sound(isStage, targetId), gap,
        events(isStage, targetId), gap,
        control(isStage, targetId), gap,
        sensing(isStage, targetId), gap,
        operators(isStage, targetId), gap,
        variables(isStage, targetId), gap,
        myBlocks(isStage, targetId)
    ];

    if (categoriesXML) {
        everything.push(gap, categoriesXML);
    }

    everything.push(xmlClose);
    return everything.join('\n');
};

export default makeToolboxXML;
