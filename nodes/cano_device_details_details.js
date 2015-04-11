/*
 * Copyright 2014 SimpleThings, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function CanoDeviceDetailsDetailsNode(params) {
    var self=this,
        $me,
        device = null,
        locationNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        locationNode.onLive();
    }

    this.setDevice = function(dev) {
        device = dev;
        self.refresh();
    }

    locationNode = new CanoEditable({
        textClass: "devmgr_device_editable_location_text",
        inputClass: "devmgr_device_editable_location_input",
        onChange: function(value) {
            device.locationNote(value);
            device.syncWithRemote().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Problem updating location note");
                }
            });
        }
    });

    this.refresh = function() {
        if (device == null)
            return;

        locationNode.setValue(device.locationNote());
        var lastActivity = device.lastActivitySecondsAgo();

        $me.html(CanopyUtil_Compose(["\
            <table cellspacing=0 cellpadding=8 class=devmgr_prop_table style='font-size:16px'>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        Activity Status:\
                    </td>\
                    <td>\
                        " + (CanopyUtil_LastSeenSecondsAgoText(lastActivity)) + "\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        Websocket:\
                    </td>\
                    <td>\
                        " + CanopyUtil_ConnectionStatusText(lastActivity, device.websocketConnected() ? "connected" : "disconnected") + "\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        UUID\
                    </td>\
                    <td>\
                        <div style='font-size:14px; font-family:monospace'>\
                            " + device.id() + "\
                        </div>\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        Secret Key\
                    </td>\
                    <td>\
                        <div style='font-size:14px; font-family:monospace'>\
                            " + device.secretKey() + "\
                        </div>\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        Location Note\
                    </td>\
                    <td>\
                        ", locationNode, "\
                    </td>\
                </tr>\
            </table><br>\
        "]));
    }

    $me = $("<div>");
    this.refresh();
}

