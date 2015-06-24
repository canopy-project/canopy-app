/*
 * Copyright 2015 Canopy Services, Inc.
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

/*
 * Organization Member List screen
 *
 *  PARAMS:
 *      params.org -- Optional CanopyOrganization object
 *
 */
function DmOrgInviteMemberScreen(params) {
    cuiInitNode(this);

    var inviteBtn;

    this.onConstruct = function() {
        inviteBtn = new CuiButton({
            cssClass: "cui_default",
            content: "ADD MEMBER",
        });

        cancelBtn = new CuiButton({
            content: "CANCEL",
            cssClass: "cui_default cui_gray",
            onClick: function() {
                if (params.onCancel) {
                    params.onCancel();
                }
            }
        });


        return [
            "<div style='margin-left:240px; margin-top:24px'>",
                "<div class='xl'>Add Member</div>",
                "<br>",
                "<div class='s'>Enter username or email address of the person you would like to add to this organization.</div>",
                "<input></input><br><br>",
                inviteBtn,
                " ",
                cancelBtn,
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        return cuiRefresh([inviteBtn, cancelBtn], live);
    }
}

