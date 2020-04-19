Import-Module -Name UniversalDashboard.Community -RequiredVersion 2.8.1
Import-Module -Name UniversalDashboard.UDDrag
Get-UDDashboard | Stop-UDDashboard

Start-UDDashboard -Port 10005 -Dashboard (
    New-UDDashboard -Title "Powershell UniversalDashboard" -Content {
        New-UDDrag -Id "Drag" -Content { "Wow it worked" }
    }
)
