# Connect to L2TP/IPSec VPN
<p>
  <a href="https://github.com/mizumotok/l2tp-ipsec-action/actions"><img alt="l2tp-ipsec-action status" src="https://github.com/mizumotok/l2tp-ipsec-action/workflows/build-test/badge.svg"></a>
</p>

This action connects to VPN via L2TP/IPSec. It supports Ubuntu platform only.

# Usage
```yaml
- name: Connect to VPN
  uses: mizumotok/l2tp-ipsec-action@v1
  with:
    pre-shared-key: ${{ secrets.VPN_PSK }}
    ip-address: ${{ secrets.VPN_IPADDRESS }}
    username: ${{ secrets.VPN_USERNAME }}
    password: ${{ secrets.VPN_PASSWORD }}
```

# Inputs
|Key|Value|Required|
|-|-|-|
|pre-shared-key|Pre-Shared Key|Yes|
|ip-address|The IP address of the participant's public-network interface|Yes|
|username|VPN username|Yes|
|password|VPN password|Yes|
