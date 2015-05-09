/*
 * Copyright 2014 Gregory Prisament
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

function CanopyUtil_IsValidEmail(email) {
    /* http://davidcel.is/blog/2012/09/06/stop-validating-email-addresses-with-regex/ */

    /*http://stackoverflow.com/questions/46155/validate-email-address-in-javascript */
    return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g.test(email);
}

function CanopyUtil_GetURLParams() {
    var params = [];
    var query = location.search.slice(1).split('&');
    $.each(query, function(i, value) {
        var token = value.split('=');
        params[decodeURIComponent(token[0])] = decodeURIComponent(token[1]);
    });
    return params;
}

function CanopyUtil_ConnectionStatusText(lastActivitySecondsAgo, connectionStatus) {
    if (lastActivitySecondsAgo == null) {
        return "-";
    }
    else {
        if (connectionStatus === true)
            return "<span style='color:#30b030; font-weight:400'>Connected</span>";
        if (connectionStatus === false)
            return "<span style='color:#b03030; font-weight:400'>Disconnected</span>";
    }
    return "unknown";
}

function CanopyUtil_LastSeenSecondsAgoText(seconds) {
    if (seconds == null) {
        return "<span style='color:#3060b0; font-weight:400'>Newly Created</span>"
    }
    if (seconds < 60) {
        return "<span style='color:#30b030; font-weight:400'>Active</span>";
    }
    else if (seconds >= 60 && seconds < 60*60) {
        var mins = Math.floor(seconds/60);
        return "<span style='color:#a0a030; font-weight:400'>Inactive (" + mins + "m)</span>";
    }
    else if (seconds >= 60*60 && seconds < 24*60*60) {
        var hours = Math.floor(seconds/(60*60));
        return "<span style='color:#b03030; font-weight:400'>Inactive (" + hours + "h)</span>";
    }
    else {
        var days = Math.floor(seconds/(24*60*60));
        return "<span style='color:#b03030; font-weight:400'>Inactive (" + days + "d)</span>";
    }
    return seconds;
}

function CanopyUtil_Compose(segments) {
    var i;
    var numSegments = segments.length;
    var out = [];
    var $out;
    var placeholderCnt = 0;
    var placeholders = [];
    for (i = 0; i < numSegments; i++) {
        if (typeof segments[i] === "string") {
            /* regular string, just append to output */
            out.push(segments[i]);
        }
        else if (typeof segments[i] === "object") {
            if (segments[i].get$) {
                /* canopy node object.  Create placeholder */
                var placeholderId = "_tmpid_" + placeholderCnt;
                out.push("<div id=" + placeholderId + "/>");
                placeholders.push({
                    id: placeholderId,
                    $segment: segments[i].get$()
                });
                placeholderCnt++;
            }
            else if (segments[i] instanceof jQuery) {
                /* jquery object.  Create placeholder */
                var placeholderId = "_tmpid_" + placeholderCnt;
                out.push("<div id=" + placeholderId + "/>");
                placeholders.push({
                    id: placeholderId,
                    $segment: segments[i]
                });
                placeholderCnt++;
            }
        }
    }

    $out = $(out.join(""));

    /* replace placeholders with actual content */
    for (i = 0; i < placeholderCnt; i++) {
        var id = placeholders[i].id;
        var $segment = placeholders[i].$segment;
        $out.find("#" + id).replaceWith($segment);
    }

    return $out;
}
